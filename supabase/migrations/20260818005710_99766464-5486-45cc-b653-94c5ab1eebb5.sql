CREATE TABLE public.menu_overrides (
  item_id text PRIMARY KEY,
  price numeric(10,2),
  available boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.menu_overrides TO anon;
GRANT SELECT ON public.menu_overrides TO authenticated;
GRANT ALL ON public.menu_overrides TO service_role;

ALTER TABLE public.menu_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu overrides are public to read"
ON public.menu_overrides FOR SELECT
TO anon, authenticated
USING (true);