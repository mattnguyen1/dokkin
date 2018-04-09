defmodule Dokkin.Constants do
  defmacro __using__(_) do
    quote do

      @alliance_types %{1 => "Super", 2 => "Extreme"}
      @element %{
        0 => :agl,
        1 => :teq,
        2 => :int,
        3 => :str,
        4 => :phy,
        10 => :super_agl,
        11 => :super_teq,
        12 => :super_int,
        13 => :super_str,
        14 => :super_phy,
        20 => :ext_agl,
        21 => :ext_teq,
        22 => :ext_int,
        23 => :ext_str,
        24 => :ext_phy
      }
      @rarity %{
        0 => :n,
        1 => :r,
        2 => :sr,
        3 => :ssr,
        4 => :ur,
        5 => :lr
      }
    end
  end
end
