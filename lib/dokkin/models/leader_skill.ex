defmodule Dokkin.LeaderSkill do
  use Ecto.Schema
  import Ecto.Changeset


  schema "leader_skills" do
    field :description, :string
    field :name, :string
  end

  @doc false
  def changeset(leader_skill, attrs) do
    leader_skill
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
