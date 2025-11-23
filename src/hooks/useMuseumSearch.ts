import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Museum } from "./useMuseums";

export const useMuseumSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["museums", "search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];

      const { data, error } = await supabase
        .from("museums")
        .select("*")
        .or(`name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
        .order("name")
        .limit(10);

      if (error) throw error;
      return data as Museum[];
    },
    enabled: searchQuery.trim().length > 0,
  });
};
