defmodule Dokkin.Repo.Migrations.CreateCardAwakenings do
  use Ecto.Migration

  def change do
    create table(:card_awakenings) do
      add :awakening_item_id, :integer
      add :quantity, :integer
      add :card_awakening_set, :integer

      timestamps()
    end

  end
end
