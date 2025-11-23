import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Museum {
  id: string;
  name: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  kuula_embed_url: string | null;
  opening_hours: string | null;
  visitor_capacity: number | null;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
}

export const useMuseums = () => {
  return useQuery({
    queryKey: ["museums"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("museums")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Museum[];
    },
  });
};

export const useMuseum = (id: string | undefined) => {
  return useQuery({
    queryKey: ["museum", id],
    queryFn: async () => {
      if (!id) throw new Error("Museum ID is required");

      const { data, error } = await supabase
        .from("museums")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Museum;
    },
    enabled: !!id,
  });
};
