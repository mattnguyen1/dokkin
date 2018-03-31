defmodule Dokkin.Repo.Migrations.CreateLinkSkills do
  use Ecto.Migration

  def change do
    create table(:link_skills) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
