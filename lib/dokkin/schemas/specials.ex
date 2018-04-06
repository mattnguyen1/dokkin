defmodule Dokkin.Specials do
  use Ecto.Schema
  import Ecto.Changeset


  schema "specials" do
    field :description, :string
    field :name, :string
  end

  @doc false
  def changeset(specials, attrs) do
    specials
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
