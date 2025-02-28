"use client";

import { useReleases } from "@/hooks/useReleases";
import Table from "../table/Table";
import SearchBar from "./SearchBar";

const SearchTable = () => {
  const data = [
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Combat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fsadfantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid fPrime", platform: "GameCube" },
    { id: 5, name: "Halo: asdfasdCombat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Masdario", platform: "NES" },
    { id: 2, name: "Zelda: ddf of Time", platform: "N64" },
    { id: 3, name: "Final Fafsantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Pasdrime", platform: "GameCube" },
    { id: 5, name: "Halo: Cdoasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mfaarfrina of Time", platform: "N64" },
    { id: 3, name: "Final Fasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mafdfassdfasdfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Finadfl Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Cosmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Madfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fanasdtasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Comfasbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Combat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fsadfantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid fPrime", platform: "GameCube" },
    { id: 5, name: "Halo: asdfasdCombat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Masdario", platform: "NES" },
    { id: 2, name: "Zelda: ddf of Time", platform: "N64" },
    { id: 3, name: "Final Fafsantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Pasdrime", platform: "GameCube" },
    { id: 5, name: "Halo: Cdoasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mfaarfrina of Time", platform: "N64" },
    { id: 3, name: "Final Fasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mafdfassdfasdfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Finadfl Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Cosmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Madfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fanasdtasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Comfasbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Combat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mario", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fsadfantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid fPrime", platform: "GameCube" },
    { id: 5, name: "Halo: asdfasdCombat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Masdario", platform: "NES" },
    { id: 2, name: "Zelda: ddf of Time", platform: "N64" },
    { id: 3, name: "Final Fafsantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Pasdrime", platform: "GameCube" },
    { id: 5, name: "Halo: Cdoasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mfaarfrina of Time", platform: "N64" },
    { id: 3, name: "Final Fasdmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Mafdfassdfasdfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Finadfl Fantasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Cosmbat Evolved", platform: "Xbox" },
    { id: 1, name: "Super Madfrio", platform: "NES" },
    { id: 2, name: "Zelda: Ocarina of Time", platform: "N64" },
    { id: 3, name: "Final Fanasdtasy VII", platform: "PS1" },
    { id: 4, name: "Metroid Prime", platform: "GameCube" },
    { id: 5, name: "Halo: Comfasbat Evolved", platform: "Xbox" },
  ];

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Game" },
    { accessorKey: "platform", header: "Platform" },
  ];

  const releases = useReleases(10);
  console.log(releases);

  return (
    <>
      <SearchBar />
      <Table data={data} columns={columns} />
    </>
  );
};
export default SearchTable;
