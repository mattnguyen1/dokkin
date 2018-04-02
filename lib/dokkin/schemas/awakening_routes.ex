defmodule Dokkin.AwakeningRoutes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "card_awakening_routes" do
    field :card_id, :integer
    field :type, :string
  end

  @doc false
  def changeset(awakening_routes, attrs) do
    awakening_routes
    |> cast(attrs, [:card_id, :type])
    |> validate_required([:card_id, :type])
  end
end
