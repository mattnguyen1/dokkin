defmodule Dokkin.Repo.Migrations.CreatePassiveSkillSets do
  use Ecto.Migration

  def change do
    create table(:passive_skill_sets) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
