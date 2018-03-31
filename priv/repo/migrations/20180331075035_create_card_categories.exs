defmodule Dokkin.Repo.Migrations.CreateCardCategories do
  use Ecto.Migration

  def change do
    create table(:card_categories) do
      add :name, :string

      timestamps()
    end

  end
end
