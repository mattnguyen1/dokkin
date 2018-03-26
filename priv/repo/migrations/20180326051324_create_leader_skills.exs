defmodule Dokkin.Repo.Migrations.CreateLeaderSkills do
  use Ecto.Migration

  def change do
    create table(:leader_skills) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
