defmodule Dokkin.Categories do
  use Ecto.Schema
  import Ecto.Changeset


  schema "card_categories" do
    field :name, :string
  end

  @doc false
  def changeset(categories, attrs) do
    categories
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
