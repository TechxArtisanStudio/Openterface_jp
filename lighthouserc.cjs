module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4321',
      startServerReadyPattern: 'Local',
      url: ['http://localhost:4321/', 'http://localhost:4321/products/kvm-go/'],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
