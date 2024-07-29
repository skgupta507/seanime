package extension_repo

import (
	"bufio"
	"context"
	"fmt"
	"github.com/goccy/go-json"
	"github.com/rs/zerolog"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"seanime/internal/extension"
	"strings"
	"time"
)

var (
	ErrExtensionAlreadyInstalled = fmt.Errorf("extension with this ID already exists")
)

// writeExtensionToFile is used to write an extension to a file.
// A ful sanity check should be done before calling this function.
func writeExtensionToFile(ext *extension.Extension, extensionDir string, fileExtension string, logger *zerolog.Logger) error {
	logger.Trace().Str("id", ext.ID).Msg("extensions: Writing extension to file")

	var err error

	// Check file with same ID does not exist
	// Even if a file has a different extension, it should not have the same ID
	err = filepath.WalkDir(extensionDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		fName := filepath.Base(path)                           // e.g. "my-extension.json"
		fName = strings.TrimSuffix(fName, filepath.Ext(fName)) // e.g. "my-extension"
		// If the file already exists, return an error
		if fName == ext.ID {
			return ErrExtensionAlreadyInstalled
		}
		return nil
	})
	if err != nil {
		return err
	}

	filename := ext.ID + fileExtension

	// Create the file
	file, err := os.Create(filepath.Join(extensionDir, filename))
	if err != nil {
		logger.Error().Err(err).Str("id", ext.ID).Msg("extensions: Failed to create extension file")
		return fmt.Errorf("failed to create extension file, %w", err)
	}
	defer file.Close()

	if fileExtension == ".json" {

		// Write the extension to the file
		enc := json.NewEncoder(file)
		err = enc.Encode(ext)
		if err != nil {
			logger.Error().Err(err).Str("id", ext.ID).Msg("extensions: Failed to write extension to file")
			return fmt.Errorf("failed to write extension to file, %w", err)
		}

	} else {

		// Write the extension payload to the file
		_, err = file.WriteString(ext.Payload)
		if err != nil {
			logger.Error().Err(err).Str("id", ext.ID).Msg("extensions: Failed to write extension payload to file")
			return fmt.Errorf("failed to write extension payload to file, %w", err)
		}

	}

	return nil
}

// extractExtension is used to get an extension from a repository URL (when installing) or a file (when it is installed).
// Payload should be emptied if retrieving already installed extension.
func extractExtension(filePathOrURL string, logger *zerolog.Logger) (*extension.Extension, string, error) {
	var ext extension.Extension
	var contentB []byte
	var err error

	var isFile bool
	var fileExt string

	logger.Trace().Str("from", filePathOrURL).Msg("extensions: Extracting extension")

	// Check if the input is a URL or a file path
	if strings.HasPrefix(filePathOrURL, "http://") || strings.HasPrefix(filePathOrURL, "https://") {
		contentB, fileExt, err = fetchContentFromURL(filePathOrURL)
	} else {
		isFile = true
		contentB, err = fetchContentFromFile(filePathOrURL)

		// Get the file extension
		// This will be overwritten but doesn't matter
		fileExt = filepath.Ext(filePathOrURL)
	}
	if err != nil {
		return nil, "", err
	}

	if fileExt == ".json" {

		logger.Trace().Str("from", filePathOrURL).Msg("extensions: Parsing JSON extension")

		// Parse the JSON content
		err = json.Unmarshal(contentB, &ext)
		if err != nil {
			return nil, "", fmt.Errorf("failed to parse JSON: %v", err)
		}

	} else {
		ext.Payload = string(contentB)

		// Parse the content to extract the fields
		scanner := bufio.NewScanner(strings.NewReader(string(contentB)))
		var withinExtension bool
		for scanner.Scan() {
			line := scanner.Text()

			if strings.HasPrefix(line, "// --start extension") {
				withinExtension = true
				continue
			} else if strings.HasPrefix(line, "// --end extension") {
				withinExtension = false
				break
			}

			if !withinExtension {
				continue
			}

			if strings.HasPrefix(line, "//@") {
				// Add a space between the comment and the field
				line = strings.Replace(line, "//@", "// @", 1)
			}

			// Match and extract the fields
			if strings.HasPrefix(line, "// @") {
				parts := strings.SplitN(line, " ", 3)
				if len(parts) < 3 {
					continue
				}

				key := parts[1]
				value := parts[2]

				switch key {
				case "@id":
					ext.ID = value
				case "@name":
					ext.Name = value
				case "@description":
					ext.Description = value
				case "@author":
					ext.Author = value
				case "@manifestUri":
					ext.ManifestURI = value
				case "@type":
					ext.Type = extension.Type(strings.ToLower(value))
				case "@language":
					ext.Language = extension.Language(strings.ToLower(value))
				case "@version":
					ext.Version = strings.TrimPrefix(value, "v")
				case "@icon":
					ext.Meta.Icon = value
				case "@website":
					ext.Meta.Website = value
				}
			}
		}
	}

	if isFile {
		// If the extension is a file, make sure the id is the same as the filename
		filename := strings.TrimSuffix(filepath.Base(filePathOrURL), fileExt)
		if ext.ID == "" || ext.ID != filename {
			return nil, "", fmt.Errorf("extension ID does not match filename, filename: %s, ID: %s", filename, ext.ID)
		}
	} else {
		// If the extension is a URL, set the manifest URI
		if ext.ManifestURI == "" {
			ext.ManifestURI = filePathOrURL
		}
	}

	// Manifest check
	if err := manifestSanityCheck(&ext); err != nil {
		return nil, "", err
	}

	// Overwrite the fie extension variable if the extension has a language field
	// This should always be the case
	switch ext.Language {
	case extension.LanguageGo:
		fileExt = ".go"
	case extension.LanguageJavascript:
		fileExt = ".js"
	case extension.LanguageTypescript:
		fileExt = ".ts"
	}

	return &ext, fileExt, nil
}

func fetchContentFromURL(url string) ([]byte, string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, "", err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, "", err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, "", fmt.Errorf("failed to fetch URL: %s", resp.Status)
	}

	// Guess the extension, this is not critical
	ext := filepath.Ext(resp.Request.URL.Path)
	if ext == "" || !(ext == ".json" || ext == ".js" || ext == ".ts") {
		contentType := resp.Header.Get("Content-Type")
		if strings.Contains(contentType, "application/json") {
			ext = ".json"
		} else if strings.Contains(contentType, "application/typescript") || strings.Contains(contentType, "application/x-typescript") {
			ext = ".ts"
		} else if strings.Contains(contentType, "application/javascript") {
			ext = ".js"
		}
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, "", err
	}

	return body, ext, nil
}

func fetchContentFromFile(filePath string) ([]byte, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	return content, nil
}
