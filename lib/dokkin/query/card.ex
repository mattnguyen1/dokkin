defmodule Dokkin.Query.Card do
  @moduledoc """
  Module for querying the Card table
  """

  alias Dokkin.QueryBuilder

  @spec get_from_ids(list) :: list
  def get_from_ids(ids) when is_list(ids) do
    Card
    |> QueryBuilder.Card.by_ids(ids)
    |> QueryBuilder.Card.query_detailed()
    |> Repo.all()
    |> merge_super_attacks()
  end

  @spec merge_super_attacks(list) :: list
  defp merge_super_attacks(card_list) do
    card_list
    |> Enum.reverse()
    |> Enum.reduce([], &do_merge_super_attacks/2)
  end

  @spec do_merge_super_attacks(map, list) :: list
  defp do_merge_super_attacks(card, []) do
    [card]
  end

  @spec do_merge_super_attacks(map, list) :: list
  defp do_merge_super_attacks(card, card_list) do
    if List.first(card_list).card.id == card.card.id do
      List.update_at(card_list, 0, fn (card_dupe) ->
        %{card |
          super_attack: card.super_attack ++ card_dupe.super_attack,
          super_attack_description: card.super_attack_description ++ card_dupe.super_attack_description
        }
      end)
    else
      [card | card_list]
    end
  end
end