-- Create museums table
CREATE TABLE IF NOT EXISTS public.museums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT,
  kuula_embed_url TEXT,
  opening_hours TEXT,
  visitor_capacity INTEGER,
  featured_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.museums ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read museums (public data)
CREATE POLICY "Museums are viewable by everyone"
  ON public.museums
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert museums
CREATE POLICY "Authenticated users can insert museums"
  ON public.museums
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update museums
CREATE POLICY "Authenticated users can update museums"
  ON public.museums
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to delete museums
CREATE POLICY "Authenticated users can delete museums"
  ON public.museums
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_museums_updated_at
  BEFORE UPDATE ON public.museums
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample museums data
INSERT INTO public.museums (name, location, description, kuula_embed_url, opening_hours, featured_image) VALUES
  ('The Louvre', 'Paris, France', 'The world''s largest art museum and a historic monument in Paris. Home to thousands of works including the Mona Lisa and Venus de Milo.', 'https://kuula.co/share/collection/7qnW0?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Monday: Closed
Tuesday-Sunday: 9 AM - 6 PM', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a'),
  
  ('British Museum', 'London, United Kingdom', 'A public museum dedicated to human history, art and culture. Its permanent collection numbers some 8 million works.', 'https://kuula.co/share/collection/7Pkqx?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Daily: 10 AM - 5:30 PM
Friday: 10 AM - 8:30 PM', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
  
  ('Metropolitan Museum of Art', 'New York, USA', 'The largest art museum in the United States. Its permanent collection contains over 2 million works.', 'https://kuula.co/share/collection/7l4cG?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Sunday-Thursday: 10 AM - 5 PM
Friday-Saturday: 10 AM - 9 PM', 'https://images.unsplash.com/photo-1566127444979-b3d2b654e1d7'),
  
  ('Vatican Museums', 'Vatican City', 'Christian and art museums located within Vatican City. They display works from the immense collection amassed by popes.', 'https://kuula.co/share/collection/7qKWb?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Monday-Saturday: 9 AM - 6 PM
Last Sunday of month: Free entry 9 AM - 2 PM', 'https://images.unsplash.com/photo-1531572753322-ad063cecc140'),
  
  ('Rijksmuseum', 'Amsterdam, Netherlands', 'Dutch national museum dedicated to arts and history. The museum has on display 8,000 objects of art and history.', 'https://kuula.co/share/collection/7qnqH?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Daily: 9 AM - 5 PM', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482'),
  
  ('Hermitage Museum', 'St. Petersburg, Russia', 'Museum of art and culture featuring millions of items including the largest collection of paintings in the world.', 'https://kuula.co/share/collection/7qKqv?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1', 'Tuesday-Sunday: 10:30 AM - 6 PM
Wednesday, Friday: 10:30 AM - 9 PM', 'https://images.unsplash.com/photo-1591699375862-e94ccc9f7edf');
