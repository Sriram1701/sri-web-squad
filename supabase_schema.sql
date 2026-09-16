-- ==============================================================================
-- SRI WEB SQUAD - SUPABASE POSTGRESQL DATABASE SCHEMA
-- ==============================================================================
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- to create all tables for projects, renewal reminders, leads, and admin settings.
-- ==============================================================================

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  project_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  secondary_phone TEXT,
  client_email TEXT,
  category TEXT NOT NULL DEFAULT 'Website',
  domain_name TEXT,
  domain_registrar TEXT DEFAULT 'GoDaddy',
  domain_start_date DATE,
  domain_expiry_date DATE,
  domain_renewal_amount NUMERIC DEFAULT 0,
  hosting_provider TEXT DEFAULT 'Hostinger Cloud',
  hosting_start_date DATE,
  hosting_expiry_date DATE,
  hosting_renewal_amount NUMERIC DEFAULT 0,
  amc_amount NUMERIC DEFAULT 0,
  ssl_included BOOLEAN DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  live_url TEXT,
  agreement_pdf_name TEXT,
  agreement_pdf_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_reminder_sent_at TIMESTAMPTZ
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL DEFAULT 'Website Development',
  budget TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  admin_email TEXT DEFAULT 'admin@sriwebsquad.com',
  admin_pass TEXT DEFAULT 'admin123',
  admin_pin TEXT DEFAULT '1701',
  company_name TEXT DEFAULT 'Sri Web Squad',
  company_phone TEXT DEFAULT '+91 99446 88602',
  company_upi_id TEXT DEFAULT 'sriwebsquad@upi',
  whatsapp_template TEXT,
  notify_days_before INT DEFAULT 30,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow public / anon read and write policies (for admin API)
CREATE POLICY "Allow anon all operations on projects" 
  ON public.projects FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon all operations on leads" 
  ON public.leads FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon all operations on settings" 
  ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Settings Row
INSERT INTO public.settings (id, admin_email, company_name, company_phone, company_upi_id, notify_days_before)
VALUES ('global_settings', 'admin@sriwebsquad.com', 'Sri Web Squad', '+91 99446 88602', 'sriwebsquad@upi', 30)
ON CONFLICT (id) DO NOTHING;
