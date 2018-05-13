defmodule Dokkin.Categories do
  use Ecto.Schema
  import Ecto.Changeset


  schema "card_categories" do
    field :name, :string
    field :open_at, SQLiteDateTime
  end

  @doc false
  def changeset(categories, attrs) do
    categories
    |> cast(attrs, [:name, :open_at])
    |> validate_required([:name, :open_at])
  end
end
