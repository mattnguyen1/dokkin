defmodule Dokkin.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :name, :string
      add :character_id, :integer
      add :cost, :integer
      add :rarity, :integer
      add :element, :integer
      add :leader_skill_id, :integer

      timestamps()
    end

  end
end
