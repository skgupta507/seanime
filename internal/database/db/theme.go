package db

import (
	"gorm.io/gorm/clause"
	"seanime/internal/database/models"
)

func (db *Database) GetTheme() (*models.Theme, error) {
	var theme models.Theme
	err := db.gormdb.Where("id = ?", 1).Find(&theme).Error

	if err != nil {
		return nil, err
	}
	return &theme, nil
}

// UpsertTheme updates the theme settings.
func (db *Database) UpsertTheme(settings *models.Theme) (*models.Theme, error) {

	err := db.gormdb.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		UpdateAll: true,
	}).Create(settings).Error

	if err != nil {
		db.Logger.Error().Err(err).Msg("db: Failed to save theme in the database")
		return nil, err
	}

	db.Logger.Debug().Msg("db: Theme saved")
	return settings, nil

}
