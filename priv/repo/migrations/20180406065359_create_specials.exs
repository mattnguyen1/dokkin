defmodule Dokkin.Repo.Migrations.CreateSpecials do
  use Ecto.Migration

  def change do
    create table(:specials) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
