CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Estructura actualizada
CREATE TABLE IF NOT EXISTS "cocktail" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" text NOT NULL,
    "image_url" text NOT NULL,      -- CAMBIADO
    "ingredients" text NOT NULL,
    "instructions" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL, 
    "updated_at" timestamp DEFAULT now() NOT NULL, 
    "deleted_at" timestamp,                        
    CONSTRAINT "PK_cocktail_id" PRIMARY KEY ("id")
);

---------------------------------------------------------------
-- DATOS
---------------------------------------------------------------

INSERT INTO "cocktail" ("name", "description", "image_url", "ingredients", "instructions", "created_at", "updated_at")
VALUES 
(
    'Mojito Clásico', 
    'El rey del verano. Una mezcla refrescante de menta, lima y ron que te transporta directamente a Cuba.', 
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', 
    'Ron Blanco,Menta fresca,Azúcar,Lima,Soda,Hielo', 
    '1. Macerar la menta con el azúcar y el jugo de lima en el vaso.\n2. Agregar el ron y llenar el vaso con hielo picado.\n3. Completar con soda y remover suavemente.\n4. Decorar con una ramita de menta.', 
    NOW(), NOW()
),
(
    'Margarita', 
    'El equilibrio perfecto entre dulce, ácido y salado. Un clásico mexicano indispensable.', 
    'https://images.unsplash.com/photo-1572916136527-3436d160c738?auto=format&fit=crop&w=600&q=80', 
    'Tequila Blanco,Triple Sec (Cointreau),Jugo de Lima,Sal,Hielo', 
    '1. Escarchar el borde de la copa con sal.\n2. Agitar el tequila, triple sec y jugo de lima con hielo en una coctelera.\n3. Colar sobre la copa (con o sin hielo nuevo).', 
    NOW(), NOW()
),
(
    'Piña Colada', 
    'Dulce, cremosa y tropical. La bebida oficial de las vacaciones.', 
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', 
    'Ron Blanco,Crema de Coco,Jugo de Piña,Piña fresca,Hielo', 
    '1. Poner todos los ingredientes en una licuadora con abundante hielo.\n2. Licuar hasta obtener una textura frappé cremosa.\n3. Servir en copa alta y decorar con un triángulo de piña.', 
    NOW(), NOW()
),
(
    'Old Fashioned', 
    'Para los amantes del whisky. Un cóctel serio, fuerte y con mucha historia.', 
    'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=600&q=80', 
    'Whisky (Bourbon o Rye),Angostura Bitters,Azúcar (terrón),Piel de Naranja', 
    '1. Poner el terrón de azúcar en el vaso y mojarlo con Angostura.\n2. Disolver el azúcar con un poco de agua.\n3. Añadir el whisky y un hielo grande.\n4. Remover lentamente para enfriar y diluir un poco.', 
    NOW(), NOW()
),
(
    'Cosmopolitan', 
    'Elegante, moderno y con un color rosado inconfundible. Famoso por su sabor frutal.', 
    'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&w=600&q=80', 
    'Vodka,Triple Sec,Jugo de Arándano,Jugo de Lima', 
    '1. Añadir todos los ingredientes en una coctelera con hielo.\n2. Agitar vigorosamente hasta que esté bien frío.\n3. Colar en una copa de martini fría.\n4. Decorar con piel de lima.', 
    NOW(), NOW()
),
(
    'Negroni', 
    'El aperitivo italiano por excelencia. Amargo, dulce y herbal a partes iguales.', 
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', 
    'Gin,Campari,Vermouth Rojo,Piel de Naranja', 
    '1. Verter los ingredientes en un vaso bajo con hielo.\n2. Remover suavemente para integrar.\n3. Exprimir los aceites de la piel de naranja sobre la bebida y dejarla caer dentro.', 
    NOW(), NOW()
);