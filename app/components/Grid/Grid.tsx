import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { CustomButton } from "../CustomButton";
import { Cell } from "../Cell";
import { Caption } from "../Caption";
import { Position } from "./types";
import { isPositionEqual as isEqual } from "./utils";
import { GRID_SIZE, START, FINISH } from "./constants";

export const PathfindingGrid = () => {
  const [disabledCells, setDisabledCells] = useState<Set<string>>(new Set());
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [path, setPath] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleCell = (row: number, col: number): void => {
    const key = `${row},${col}`;
    setDisabledCells((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const findShortestPath = (cells: Set<string> = disabledCells): void => {
    setIsDirty(true);
    const directions: Position[] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const queue: Position[][] = [[START]];
    const visited: Set<string> = new Set([`${START[0]},${START[1]}`]);

    while (queue.length > 0) {
      const currentPath = queue.shift();
      if (!currentPath) continue;
      const [row, col] = currentPath[currentPath.length - 1];

      if (isEqual([row, col], FINISH)) {
        setPath(new Set(currentPath.map(([r, c]) => `${r},${c}`)));
        return;
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const key = `${newRow},${newCol}`;

        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE &&
          !cells.has(key) &&
          !visited.has(key)
        ) {
          visited.add(key);
          queue.push([...currentPath, [newRow, newCol]]);
        }
      }
    }
    setPath(new Set());
  };

  const ranzomize = () => {
    const cellsCountToDisable = Math.ceil(Math.random() * GRID_SIZE);
    let setToCalculatePathWith = new Set<string>();
    for (var i = 0; i < cellsCountToDisable; i++) {
      const pozX = Math.floor(Math.random() * GRID_SIZE);
      const pozY = Math.floor(Math.random() * GRID_SIZE);
      if ((pozX === 0 && pozY === 0) || (pozX === 7 && pozY === 7)) {
        continue;
      }
      const key = `${pozX},${pozY}`;
      setDisabledCells((prev) => {
        const newSet = new Set(prev);
        if (!newSet.has(key)) newSet.add(key);
        setToCalculatePathWith = newSet;
        return newSet;
      });
      timeoutRef.current = setTimeout(
        () => findShortestPath(setToCalculatePathWith),
        500
      );
    }
  };
  const reset = () => {
    setDisabledCells(new Set());
    setIsDirty(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);
  return (
    <View className="flex flex-1 my-10 items-center">
      <View className={`flex-row w-[90%]`}>
        {[...Array(GRID_SIZE)].map((_, row) => (
          <View key={row} className="flex flex-1">
            {[...Array(GRID_SIZE)].map((_, col) => {
              const key = `${row},${col}`;
              return (
                <Cell
                  key={key}
                  isDisabled={disabledCells.has(key)}
                  isPath={path.has(key)}
                  onPress={() => toggleCell(row, col)}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View className="flex flex-1 w-[90%] my-4">
        <CustomButton title="Find Path" onPress={findShortestPath} />
        {isDirty && (
          <Caption>
            {path.size ? `Path length is ${path.size}` : "Path not found"}
          </Caption>
        )}
        <CustomButton title="Randomize" onPress={ranzomize} />
        <CustomButton title="Reset" onPress={reset} />
      </View>
    </View>
  );
};
