defmodule Dokkin.Awakenings do
  use Ecto.Schema
  import Ecto.Changeset

  schema "card_awakenings" do
    field :awakening_item_id, :integer
    field :card_awakening_set, :integer
    field :quantity, :integer
  end

  @doc false
  def changeset(awakenings, attrs) do
    awakenings
    |> cast(attrs, [:awakening_item_id, :quantity, :card_awakening_set])
    |> validate_required([:awakening_item_id, :quantity, :card_awakening_set])
  end
end
