export interface UpdateHistoryItem {
  field?: string;
  oldValue?: any;
  newValue?: any;
  updatedAt?: string;
  _id?: string;
}

export interface GroupedHistory {
  date: string;
  updates: (Required<UpdateHistoryItem> & { time: string })[];
}

export function groupHistoryByDate(
  updateHistory: UpdateHistoryItem[]
): GroupedHistory[] {
  if (!Array.isArray(updateHistory)) {
    console.error("Invalid update history: expected an array");
    return [];
  }

  const grouped: Record<string, GroupedHistory["updates"]> = {};

  updateHistory.forEach((item, index) => {
    // Validate item structure
    if (!item || typeof item !== "object") {
      console.warn(`Skipped invalid item at index ${index}: not an object`);
      return;
    }

    // Validate updatedAt
    if (!item.updatedAt || isNaN(Date.parse(item.updatedAt))) {
      console.warn(
        `Skipped item at index ${index}: invalid updatedAt →`,
        item.updatedAt
      );
      return;
    }

    const date = item.updatedAt.split("T")[0];
    const time = item.updatedAt.split("T")[1]?.slice(0, 8) || "00:00:00";

    // Ensure required fields for each update
    const safeItem: Required<UpdateHistoryItem> = {
      field: item.field ?? "Unknown Field",
      oldValue: item.oldValue ?? null,
      newValue: item.newValue ?? null,
      updatedAt: item.updatedAt,
      _id: item._id ?? `${index}-missing-id`,
    };

    if (!grouped[date]) grouped[date] = [];

    grouped[date].push({
      ...safeItem,
      time,
    });
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([date, updates]) => ({
      date,
      updates,
    }));
}
