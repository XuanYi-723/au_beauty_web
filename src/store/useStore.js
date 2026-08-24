import { create } from 'zustand';

export const useStore = create((set) => ({
  compareList: [], // 儲存產品 ID 陣列，最多 3 個
  inquiryList: [], // 儲存 { product, quantity } 物件陣列
  
  // --- 比較功能 Actions ---
  toggleCompare: (productId) => set((state) => {
    if (state.compareList.includes(productId)) {
      return { compareList: state.compareList.filter(id => id !== productId) };
    }
    if (state.compareList.length >= 3) {
      alert("最多只能比較 3 項產品！");
      return state;
    }
    return { compareList: [...state.compareList, productId] };
  }),
  clearCompare: () => set({ compareList: [] }),

  // --- 詢問清單 Actions ---
  addToInquiry: (product) => set((state) => {
    const existing = state.inquiryList.find(item => item.product.id === product.id);
    if (existing) {
      return {
        inquiryList: state.inquiryList.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return { inquiryList: [...state.inquiryList, { product, quantity: 1 }] };
  }),
  updateInquiryQuantity: (productId, quantity) => set((state) => ({
    inquiryList: quantity <= 0 
      ? state.inquiryList.filter(item => item.product.id !== productId)
      : state.inquiryList.map(item => item.product.id === productId ? { ...item, quantity } : item)
  })),
  removeFromInquiry: (productId) => set((state) => ({
    inquiryList: state.inquiryList.filter(item => item.product.id !== productId)
  })),
  clearInquiry: () => set({ inquiryList: [] }),
}));
