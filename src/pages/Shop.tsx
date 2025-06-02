import React, { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Product } from '../types/supabase';
import { useToast } from '@/hooks/use-toast';
import { usePageView } from '../hooks/useAnalytics';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  usePageView('/');

  // Buscar categorias ao carregar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('categories').select('id, name');

        if (error) throw error;

        setCategories(data || []);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        toast({
          title: 'Erro ao carregar categorias',
          description: 'Não foi possível carregar as categorias.',
          variant: 'destructive',
        });
      }
    };

    fetchCategories();
  }, [toast]);

  // Buscar produtos ao carregar ou ao mudar o filtro
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let query = supabase.from('products').select('*').order('id', { ascending: false });

        if (selectedCategoryId !== null) {
          query = query.eq('category_id', selectedCategoryId);
        }

        const { data, error } = await query;

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        toast({
          title: 'Erro ao carregar produtos',
          description: 'Não foi possível carregar os produtos.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título e filtro */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left gold-text">Nossos Produtos</h1>

        <select
        value={selectedCategoryId ?? ''}
        onChange={(e) =>
          setSelectedCategoryId(e.target.value === '' ? null : parseInt(e.target.value))
        }
        className="bg-dark-800 text-gold-500 font-medium focus:outline-none focus:ring-0 border-0 border-b border-gold-500 hover:text-gold-400 transition"
        >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
        {cat.name}
        </option>
        ))}
        </select>

      </div>

      {/* Lista de Produtos */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-xl">Nenhum produto disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
