-- Seed data for beauty parlor services

-- Insert sample services
INSERT INTO services (name, description, duration, price, category, is_home_service, home_service_fee) VALUES
-- Facial Services
('Classic Facial', 'Deep cleansing facial with steam and extraction', 60, 2500.00, 'facial', true, 500.00),
('Anti-Aging Facial', 'Advanced anti-aging treatment with collagen mask', 90, 4000.00, 'facial', true, 800.00),
('Acne Treatment Facial', 'Specialized treatment for acne-prone skin', 75, 3000.00, 'facial', true, 600.00),
('Hydrating Facial', 'Moisturizing facial for dry skin', 60, 2800.00, 'facial', true, 500.00),

-- Hair Services
('Hair Cut & Style', 'Professional haircut with styling', 45, 1500.00, 'hair', false, 0.00),
('Hair Color', 'Full hair coloring service', 120, 5000.00, 'hair', false, 0.00),
('Hair Highlights', 'Professional highlighting service', 90, 4000.00, 'hair', false, 0.00),
('Hair Treatment', 'Deep conditioning hair treatment', 60, 2000.00, 'hair', false, 0.00),
('Bridal Hair Styling', 'Complete bridal hair styling', 90, 6000.00, 'hair', true, 1000.00),

-- Nail Services
('Manicure', 'Complete nail care and polish', 45, 1200.00, 'nails', true, 300.00),
('Pedicure', 'Complete foot care and polish', 60, 1500.00, 'nails', true, 400.00),
('Gel Manicure', 'Long-lasting gel nail polish', 60, 2000.00, 'nails', true, 400.00),
('Nail Art', 'Creative nail art design', 75, 2500.00, 'nails', true, 500.00),

-- Body Services
('Full Body Massage', 'Relaxing full body massage', 90, 4500.00, 'massage', true, 800.00),
('Body Scrub', 'Exfoliating body treatment', 60, 3000.00, 'body', true, 600.00),
('Waxing - Full Body', 'Complete body hair removal', 120, 6000.00, 'waxing', false, 0.00),
('Waxing - Face', 'Facial hair removal', 30, 800.00, 'waxing', true, 200.00),

-- Makeup Services
('Party Makeup', 'Professional makeup for events', 60, 3500.00, 'makeup', true, 700.00),
('Bridal Makeup', 'Complete bridal makeup package', 120, 8000.00, 'makeup', true, 1500.00),
('Natural Makeup', 'Everyday natural look makeup', 45, 2500.00, 'makeup', true, 500.00);

-- Insert sample staff
INSERT INTO staff (name, email, phone, specialties) VALUES
('Ayesha Khan', 'ayesha@beautyparlor.pk', '+92-300-1234567', ARRAY['facial', 'makeup']),
('Fatima Ali', 'fatima@beautyparlor.pk', '+92-301-2345678', ARRAY['hair', 'makeup']),
('Sana Ahmed', 'sana@beautyparlor.pk', '+92-302-3456789', ARRAY['nails', 'waxing']),
('Zara Sheikh', 'zara@beautyparlor.pk', '+92-303-4567890', ARRAY['massage', 'body']),
('Hina Malik', 'hina@beautyparlor.pk', '+92-304-5678901', ARRAY['facial', 'body']);

-- Insert staff availability (Monday to Saturday, 9 AM to 6 PM)
INSERT INTO staff_availability (staff_id, day_of_week, start_time, end_time)
SELECT 
    s.id,
    generate_series(1, 6) as day_of_week, -- Monday to Saturday
    '09:00:00'::time as start_time,
    '18:00:00'::time as end_time
FROM staff s;
