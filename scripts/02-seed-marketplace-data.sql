-- Seed data for the beauty marketplace

-- Insert service categories
INSERT INTO service_categories (id, name, description, icon) VALUES
(uuid_generate_v4(), 'Hair Salon', 'Hair cutting, styling, coloring, and treatments', 'scissors'),
(uuid_generate_v4(), 'Beauty Salon', 'Facials, makeup, skincare treatments', 'sparkles'),
(uuid_generate_v4(), 'Nails', 'Manicures, pedicures, nail art', 'hand'),
(uuid_generate_v4(), 'Eyebrows & Lashes', 'Eyebrow threading, lash extensions, tinting', 'eye'),
(uuid_generate_v4(), 'Massage', 'Relaxation and therapeutic massage', 'hand-heart'),
(uuid_generate_v4(), 'Spa & Sauna', 'Full spa treatments and wellness', 'leaf'),
(uuid_generate_v4(), 'Waxing', 'Hair removal services', 'zap'),
(uuid_generate_v4(), 'Bridal Services', 'Complete bridal packages', 'crown'),
(uuid_generate_v4(), 'Mehndi', 'Henna art and designs', 'palette'),
(uuid_generate_v4(), 'Skincare', 'Advanced skincare treatments', 'shield')
ON CONFLICT DO NOTHING;

-- Insert sample salon (for demo purposes)
INSERT INTO salons (id, name, description, email, phone, address, city, latitude, longitude, status, home_service_available) VALUES
(uuid_generate_v4(), 'Glamour Beauty Lounge', 'Premium beauty salon offering complete beauty services for women', 'info@glamourbeauty.pk', '+92-300-1234567', 'Main Boulevard, Gulberg III', 'Lahore', 31.5204, 74.3587, 'approved', true)
ON CONFLICT DO NOTHING;

-- Get the salon ID for adding services
DO $$
DECLARE
    salon_uuid UUID;
    hair_category_uuid UUID;
    beauty_category_uuid UUID;
    nails_category_uuid UUID;
BEGIN
    -- Get salon ID
    SELECT id INTO salon_uuid FROM salons WHERE name = 'Glamour Beauty Lounge' LIMIT 1;
    
    -- Get category IDs
    SELECT id INTO hair_category_uuid FROM service_categories WHERE name = 'Hair Salon' LIMIT 1;
    SELECT id INTO beauty_category_uuid FROM service_categories WHERE name = 'Beauty Salon' LIMIT 1;
    SELECT id INTO nails_category_uuid FROM service_categories WHERE name = 'Nails' LIMIT 1;
    
    -- Insert sample services if salon exists
    IF salon_uuid IS NOT NULL THEN
        INSERT INTO services (salon_id, category_id, name, description, duration, price, home_service_price) VALUES
        (salon_uuid, hair_category_uuid, 'Hair Cut & Style', 'Professional hair cutting and styling', 60, 1500.00, 500.00),
        (salon_uuid, hair_category_uuid, 'Hair Color', 'Full hair coloring service', 120, 3500.00, 800.00),
        (salon_uuid, hair_category_uuid, 'Hair Wash & Blow Dry', 'Hair washing and professional blow dry', 45, 800.00, 300.00),
        (salon_uuid, beauty_category_uuid, 'Facial Treatment', 'Deep cleansing facial with mask', 75, 2500.00, 600.00),
        (salon_uuid, beauty_category_uuid, 'Bridal Makeup', 'Complete bridal makeup package', 180, 8000.00, 2000.00),
        (salon_uuid, beauty_category_uuid, 'Party Makeup', 'Glamorous party makeup', 90, 3500.00, 1000.00),
        (salon_uuid, nails_category_uuid, 'Manicure', 'Complete hand and nail care', 45, 1200.00, 400.00),
        (salon_uuid, nails_category_uuid, 'Pedicure', 'Complete foot and nail care', 60, 1500.00, 500.00)
        ON CONFLICT DO NOTHING;
        
        -- Insert sample staff
        INSERT INTO staff (salon_id, name, specialties, bio) VALUES
        (salon_uuid, 'Ayesha Khan', ARRAY['Hair Styling', 'Hair Coloring'], 'Expert hair stylist with 8 years experience'),
        (salon_uuid, 'Fatima Ali', ARRAY['Makeup', 'Bridal Services'], 'Professional makeup artist specializing in bridal looks'),
        (salon_uuid, 'Sana Ahmed', ARRAY['Nails', 'Skincare'], 'Certified nail technician and skincare specialist')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
