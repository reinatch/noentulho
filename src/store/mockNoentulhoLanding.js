// Mock data for the No Entulho landing page used for local development
const mockFilmes = {
  noentulhoLanding: {
    page_data: [
      {
        acf_fc_layout: 'home',
        titulo: 'NO ENTULHO — OPEN CALL'
      },
      {
        acf_fc_layout: 'section_1',
        pt: {
          titulo: 'Sobre (PT)',
          texto: 'Este é um texto de exemplo em Português para a secção 1. Use este espaço para uma breve descrição.'
        },
        en: {
          titulo: 'About (EN)',
          texto: 'This is a sample English text for section 1. Use this area for a short description.'
        }
      },
      {
        acf_fc_layout: 'section_2',
        pt: {
          titulo: 'Links (PT)',
          texto: 'Algum texto adicional em Português para a secção de links.'
        },
        en: {
          titulo: 'Links (EN)',
          texto: 'Some additional English text for the links section.'
        }
      },
      {
        acf_fc_layout: 'section_3',
        titulo: 'External Links',
        link_pt: { url: 'https://example.com/pt', title: 'Visitar' },
        link_en: { url: 'https://example.com/en', title: 'Visit' }
      },
      {
        acf_fc_layout: 'section_4',
        pt: {
          titulo: 'Downloads',
          link: { url: 'https://example.com/downloads/pt', title: 'Download' }
        },
        en: {
          titulo: 'Downloads',
          link: { url: 'https://example.com/downloads/en', title: 'Download' }
        }
      },
      {
        acf_fc_layout: 'section_5',
        titulo_pt: 'Vídeo',
        titulo_en: 'Video',
        // Vimeo numeric id (Home.vue uses vimeo-player :video-id)
        video: '76979871'
      },
      // section_6 (sound) intentionally left without a track to avoid player runtime errors
      // add a valid track string here if you want the SoundCloud player to mount
      {
        acf_fc_layout: 'section_6',
        titulo_pt: 'Som',
        titulo_en: 'Sound',
        som: null
      },
      {
        acf_fc_layout: 'section_7',
        titulo_pt: 'Galeria',
        titulo_en: 'Gallery',
          galeria: [
          { id: 1, url: '/Logo_branco.png', sizes: { thumbnail: '/Logo_branco.png' } },
          { id: 2, url: '/resources/lava/cloud.png', sizes: { thumbnail: '/resources/lava/cloud.png' } },
          { id: 3, url: '/resources/lava/lavatile.jpg', sizes: { thumbnail: '/resources/lava/lavatile.jpg' } }
        ]
      },
      {
        acf_fc_layout: 'section_8',
        pt: {
          titulo: 'Projeto',
          link: { url: 'https://example.com/projeto-pt', title: 'Ver Projeto' },
          imagem: { sizes: { medium: '/resources/lava/cloud.png' }, title: 'Imagem Projeto' }
        },
        en: {
          titulo: 'Project',
          link: { url: 'https://example.com/project-en', title: 'See Project' },
          imagem: { sizes: { medium: '/resources/lava/lavatile.jpg' }, title: 'Project Image' }
        }
      }
    ]
  }
};

export default mockFilmes;
