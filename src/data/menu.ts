export type MenuTab = "local" | "casa";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export type MenuCatalog = Record<MenuTab, MenuSection[]>;

/**
 * Fonte única de dados do cardápio.
 *
 * O painel administrativo pode futuramente substituir/atualizar o campo
 * `available` de cada item sem precisar alterar o componente visual.
 */
export const menuCatalog: MenuCatalog = {
  local: [
    {
      id: "porcoes-e-cuias",
      title: "Porções e Cuias",
      items: [
        {
          id: "acai-na-cuia",
          name: "Açaí na cuia",
          description: "Acompanha farinha",
          price: 19,
          available: true,
        },
        {
          id: "jarra-acai-500ml",
          name: "Jarra de açaí - 500 ml",
          description: "Acompanha farinha",
          price: 29.99,
          available: true,
        },
        { id: "tacaca-m", name: "Tacacá - Cuia M", price: 35, available: true },
        { id: "tacaca-g", name: "Tacacá - Cuia G", price: 38, available: true },
        { id: "vatapa-m", name: "Vatapá - Cuia M", price: 28, available: true },
        { id: "vatapa-g", name: "Vatapá - Cuia G", price: 35, available: true },
        { id: "manicoba-m", name: "Maniçoba - M", price: 46.99, available: true },
        { id: "manicoba-g", name: "Maniçoba - G", price: 56.99, available: true },
      ],
    },
    {
      id: "porcoes-individuais",
      title: "Porções Individuais",
      items: [
        {
          id: "espetinho-carne",
          name: "Espetinho (carne)",
          description: "Acompanha vinagrete e farofa",
          price: 10,
          available: true,
        },
        {
          id: "combo-baiao-espetinho",
          name: "Combo baião + espetinho",
          description: "Baião de dois, 1 espetinho, farofa e vinagrete",
          price: 23.99,
          available: true,
        },
        { id: "porcao-arroz", name: "Porção de arroz - 250 g", price: 14, available: true },
        { id: "arroz-galinha-m", name: "Arroz com galinha - M", price: 18, available: true },
        { id: "arroz-galinha-g", name: "Arroz com galinha - G", price: 21, available: true },
        { id: "charque-200g", name: "Charque - 200 g", price: 32, available: true },
        { id: "camarao-200g", name: "Camarão - 200 g", price: 32, available: true },
        { id: "calabresa-200g", name: "Calabresa frita - 200 g", price: 19.99, available: true },
        { id: "farofa-charque-200g", name: "Farofa de charque - 200 g", price: 15.99, available: true },
        {
          id: "isca-dourada",
          name: "Porção isca de dourada",
          description: "300 a 320 g",
          price: 42,
          available: true,
        },
      ],
    },
    {
      id: "sobremesas",
      title: "Sobremesas",
      items: [
        { id: "creme-cupuacu", name: "Creme de cupuaçu", price: 12, available: true },
        { id: "bolo-podre", name: "Bolo podre - fatia", price: 14, available: true },
      ],
    },
    {
      id: "bebidas",
      title: "Bebidas",
      items: [
        { id: "agua-sem-gas", name: "Água mineral sem gás", price: 3, available: true },
        { id: "coca-cola-lata", name: "Coca-Cola lata", price: 5, available: true },
      ],
    },
  ],
  casa: [
    {
      id: "acai-e-farinhas",
      title: "Açaí e Farinhas",
      items: [
        { id: "acai-batido-1l", name: "Açaí batido - 1 litro", price: 35, available: true },
        { id: "bacaba", name: "Bacaba", price: 27.99, available: true },
        { id: "farinha-braganca", name: "Farinha de Bragança", price: 20, available: true },
        { id: "farinha-baguda", name: "Farinha baguda", price: 13, available: true },
        { id: "farinha-tapioca", name: "Farinha de tapioca", price: 8.5, available: true },
      ],
    },
    {
      id: "polpas-e-produtos-do-norte",
      title: "Polpas e Produtos do Norte",
      items: [
        { id: "polpa-cupuacu", name: "Polpa de cupuaçu", price: 35, available: true },
        { id: "polpa-graviola", name: "Polpa de graviola", price: 20, available: true },
        { id: "polpa-muruci", name: "Polpa de muruci", price: 23.99, available: true },
        { id: "polpa-bacuri", name: "Polpa de bacuri", price: 65, available: true },
        { id: "polpa-tapereba", name: "Polpa de taperebá", price: 25.99, available: true },
        { id: "polpa-acai-12", name: "Polpa de açaí 12%", price: 25, available: true },
        { id: "tucupi-2l", name: "Tucupi - 2 litros", price: 52, available: true },
        { id: "maniva-pre-cozida", name: "Maniva pré-cozida - kg", price: 30, available: true },
        { id: "pimenta-tucupi-250ml", name: "Pimenta no tucupi - 250 ml", price: 13, available: true },
      ],
    },
    {
      id: "peixes-camarao-carnes",
      title: "Peixes, Camarão e Carnes",
      items: [
        { id: "camarao-kg", name: "Camarão - kg", price: 99.99, available: true },
        { id: "file-dourada-kg", name: "Filé de dourada - kg", price: 49.99, available: true },
        { id: "go-salgada-kg", name: "Gó salgada - kg", price: 42, available: true },
        { id: "go-resfriada-kg", name: "Gó resfriada - kg", price: 45, available: true },
        { id: "tambaqui-inteiro-kg", name: "Tambaqui inteiro - kg", price: 29.9, available: true },
        { id: "tambaqui-banda-kg", name: "Tambaqui banda - kg", price: 35, available: true },
        { id: "charque-kg", name: "Charque - kg", price: 79.9, available: true },
      ],
    },
  ],
};
