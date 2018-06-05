defmodule Dokkin.AwakeningItems do
  use Ecto.Schema
  import Ecto.Changeset

  schema "awakening_items" do
    field :description, :string
    field :name, :string
    field :rarity, :integer
  end

  @doc false
  def changeset(awakening_items, attrs) do
    awakening_items
    |> cast(attrs, [:name, :description, :rarity])
    |> validate_required([:name, :description, :rarity])
  end
end
