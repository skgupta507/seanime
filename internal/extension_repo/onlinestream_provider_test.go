package extension_repo_test

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestExternalGoOnlinestreamProviderExtension(t *testing.T) {

	repo := getRepo(t)

	// Load all extensions
	// This should load all the extensions in the directory
	repo.LoadExternalExtensions()

	ext, found := repo.GetOnlinestreamProviderExtensionByID("externalGogoanime")
	require.True(t, found)

	t.Logf("\nExtension:\n\tID: %s \n\tName: %s", ext.GetID(), ext.GetName())

	searchResults, err := ext.GetProvider().Search("Blue Lock", false)
	require.NoError(t, err)
	require.GreaterOrEqual(t, len(searchResults), 1)

	episodes, err := ext.GetProvider().FindEpisode(searchResults[0].ID)
	require.NoError(t, err)
	require.GreaterOrEqual(t, len(episodes), 1)

	server, err := ext.GetProvider().FindEpisodeServer(episodes[0], ext.GetProvider().GetEpisodeServers()[0])
	require.NoError(t, err)

	spew.Dump(server)

}