-- Seed data for multi-salon marketplace

-- Insert sample salons across Pakistan
INSERT INTO salons (name, description, owner_name, email, phone, address, city, area, opening_hours, images, is_verified, is_active) VALUES
('Glamour Studio', 'Premium beauty salon offering complete beauty services for women', 'Ayesha Khan', 'ayesha@glamourstudio.pk', '+92-300-1234567', 'Shop 15, F-7 Markaz', 'Islamabad', 'F-7', 
 '{"monday": {"open": "09:00", "close": "20:00"}, "tuesday": {"open": "09:00", "close": "20:00"}, "wednesday": {"open": "09:00", "close": "20:00"}, "thursday": {"open": "09:00", "close": "20:00"}, "friday": {"open": "09:00", "close": "20:00"}, "saturday": {"open": "10:00", "close": "22:00"}, "sunday": {"open": "10:00", "close": "18:00"}}',
 ARRAY['/placeholder.svg?height=300&width=400'], true, true),

('Beauty Lounge Karachi', 'Luxury beauty services in the heart of Karachi', 'Fatima Ahmed', 'fatima@beautylounge.pk', '+92-321-9876543', 'Plot 123, Clifton Block 2', 'Karachi', 'Clifton', 
 '{"monday": {"open": "10:00", "close": "21:00"}, "tuesday": {"open": "10:00", "close": "21:00"}, "wednesday": {"open": "10:00", "close": "21:00"}, "thursday": {"open": "10:00", "close": "21:00"}, "friday": {"open": "10:00", "close": "21:00"}, "saturday": {"open": "09:00", "close": "22:00"}, "sunday": {"open": "11:00", "close": "19:00"}}',
 ARRAY['/placeholder.svg?height=300&width=400'], true, true),

('Noor Beauty Parlor', 'Traditional and modern beauty treatments', 'Noor Malik', 'noor@noorbeauty.pk', '+92-42-12345678', '25-A, Model Town', 'Lahore', 'Model Town', 
 '{"monday": {"open": "09:00", "close": "19:00"}, "tuesday": {"open": "09:00", "close": "19:00"}, "wednesday": {"open": "09:00", "close": "19:00"}, "thursday": {"open": "09:00", "close": "19:00"}, "friday": {"open": "09:00", "close": "19:00"}, "saturday": {"open": "10:00", "close": "20:00"}, "sunday": {"open": "12:00", "close": "17:00"}}',
 ARRAY['/placeholder.svg?height=300&width=400'], true, true);

-- Insert salon categories
INSERT INTO salon_categories (salon_id, category) 
SELECT s.id, unnest(ARRAY['beauty_parlor', 'hair_salon', 'facial_spa']) 
FROM salons s;

-- Insert salon amenities
INSERT INTO salon_amenities (salon_id, amenity)
SELECT s.id, unnest(ARRAY['parking', 'wifi', 'ac', 'waiting_area', 'refreshments'])
FROM salons s;

-- Update existing services to belong to salons
UPDATE services SET salon_id = (SELECT id FROM salons LIMIT 1) WHERE salon_id IS NULL;

-- Update existing staff to belong to salons  
UPDATE staff SET salon_id = (SELECT id FROM salons LIMIT 1) WHERE salon_id IS NULL;

-- Insert additional services for different salons
INSERT INTO services (salon_id, name, description, duration, price, category, is_home_service, home_service_fee) 
SELECT 
    s.id,
    service_name,
    service_desc,
    duration,
    price,
    category,
    is_home,
    home_fee
FROM salons s,
(VALUES 
    ('Bridal Makeup', 'Complete bridal makeup package', 180, 15000, 'makeup', true, 2000),
    ('Hair Styling', 'Professional hair styling and blow dry', 60, 2500, 'hair', true, 500),
    ('Manicure & Pedicure', 'Complete nail care treatment', 90, 1800, 'nails', true, 300),
    ('Deep Cleansing Facial', 'Intensive facial treatment', 75, 3500, 'facial', true, 800)
) AS new_services(service_name, service_desc, duration, price, category, is_home, home_fee);
