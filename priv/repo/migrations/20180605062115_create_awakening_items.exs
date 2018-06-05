defmodule Dokkin.Repo.Migrations.CreateAwakeningItems do
  use Ecto.Migration

  def change do
    create table(:awakening_items) do
      add :name, :string
      add :description, :string
      add :rarity, :integer

      timestamps()
    end

  end
end
