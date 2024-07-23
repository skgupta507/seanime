// Code generated by 'yaegi extract github.com/5rahim/hibike/pkg/extension/torrent'. DO NOT EDIT.

package yaegi_interp

import (
	"github.com/5rahim/hibike/pkg/extension/torrent"
	"reflect"
)

func init() {
	Symbols["github.com/5rahim/hibike/pkg/extension/torrent/torrent"] = map[string]reflect.Value{
		// type definitions
		"AnimeTorrent":       reflect.ValueOf((*torrent.AnimeTorrent)(nil)),
		"FuzzyDate":          reflect.ValueOf((*torrent.FuzzyDate)(nil)),
		"Media":              reflect.ValueOf((*torrent.Media)(nil)),
		"Provider":           reflect.ValueOf((*torrent.Provider)(nil)),
		"SearchOptions":      reflect.ValueOf((*torrent.SearchOptions)(nil)),
		"SmartSearchOptions": reflect.ValueOf((*torrent.SmartSearchOptions)(nil)),

		// interface wrapper definitions
		"_Provider": reflect.ValueOf((*_github_com_5rahim_hibike_pkg_extension_torrent_Provider)(nil)),
	}
}

// _github_com_5rahim_hibike_pkg_extension_torrent_Provider is an interface wrapper for Provider type
type _github_com_5rahim_hibike_pkg_extension_torrent_Provider struct {
	IValue                interface{}
	WCanFindBestRelease   func() bool
	WCanSmartSearch       func() bool
	WGetTorrentInfoHash   func(torrent *torrent.AnimeTorrent) (string, error)
	WGetTorrentMagnetLink func(torrent *torrent.AnimeTorrent) (string, error)
	WSearch               func(opts torrent.SearchOptions) ([]*torrent.AnimeTorrent, error)
	WSmartSearch          func(opts torrent.SmartSearchOptions) ([]*torrent.AnimeTorrent, error)
}

func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) CanFindBestRelease() bool {
	return W.WCanFindBestRelease()
}
func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) CanSmartSearch() bool {
	return W.WCanSmartSearch()
}
func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) GetTorrentInfoHash(torrent *torrent.AnimeTorrent) (string, error) {
	return W.WGetTorrentInfoHash(torrent)
}
func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) GetTorrentMagnetLink(torrent *torrent.AnimeTorrent) (string, error) {
	return W.WGetTorrentMagnetLink(torrent)
}
func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) Search(opts torrent.SearchOptions) ([]*torrent.AnimeTorrent, error) {
	return W.WSearch(opts)
}
func (W _github_com_5rahim_hibike_pkg_extension_torrent_Provider) SmartSearch(opts torrent.SmartSearchOptions) ([]*torrent.AnimeTorrent, error) {
	return W.WSmartSearch(opts)
}