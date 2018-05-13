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
      @keyword_aliases %{
        "coora" => ["cooler"],
        "super saiyan 2" => ["ss2", "ssj2"],
        "super saiyan 3" => ["ss3", "ssj3"],
        "super saiyan 4" => ["ss4", "ssj4"],
        "super saiyan god ss" => ["ssb", "blue"],
        "super saiyan god ss vegito" => ["vb", "vegito blue"],
        "majin buu (ultimate gohan)" => ["buuhan"],
        "golden frieza (angel)" => ["agf"],
        "super vegito" => ["sv"],
        "boujack" => ["bojack"],
        "goku (ultra instinct -sign-)" => ["ui goku"]
      }
      # This isn't an extensive list, just some common ones
      @name_extras [
        "super saiyan god ss",
        "full powered", 
        "(galactic warrior)",
      ]
    end
  end
end
