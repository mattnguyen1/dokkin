defmodule Dokkin.Repo.Migrations.CreateCardSpecials do
  use Ecto.Migration

  def change do
    create table(:card_specials) do
      add :card_id, :integer
      add :special_id, :integer

      timestamps()
    end

  end
end
