defmodule Dokkin.Repo.Migrations.CreateCardAwakeningRoutes do
  use Ecto.Migration

  def change do
    create table(:card_awakening_routes) do
      add :card_id, :integer

      timestamps()
    end

  end
end
