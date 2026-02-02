// Custom Navigation Dropdown JavaScript
(function() {
  'use strict';

  // Prevent double-initialization (this script is already included via `mkdocs.yml` theme.custom.js)
  // Some templates might also include it; guard against duplicate execution.
  if (window.__openterfaceCustomNavLoaded) return;
  window.__openterfaceCustomNavLoaded = true;

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeCustomNavigation();
    handleResponsiveNavigation();
  });

  function initializeCustomNavigation() {
    // Add click handlers for dropdown items
    const dropdownItems = document.querySelectorAll('.custom-nav-dropdown');
    
    dropdownItems.forEach(function(dropdown) {
      const navItem = dropdown.querySelector('.nav-item');
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      
      if (navItem && dropdownContent) {
        // Handle click on main nav item
        navItem.addEventListener('click', function(e) {
          // If it's a link, let it navigate normally
          if (navItem.tagName === 'A') {
            return;
          }
          
          // Otherwise, toggle dropdown
          e.preventDefault();
          toggleDropdown(dropdown);
        });

        // Handle hover for better UX
        dropdown.addEventListener('mouseenter', function() {
          showDropdown(dropdown);
        });

        dropdown.addEventListener('mouseleave', function() {
          hideDropdown(dropdown);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!dropdown.contains(e.target)) {
            hideDropdown(dropdown);
          }
        });
      }
    });
  }

  function toggleDropdown(dropdown) {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      if (dropdownContent.style.opacity === '1') {
        hideDropdown(dropdown);
      } else {
        showDropdown(dropdown);
      }
    }
  }

  function showDropdown(dropdown) {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.opacity = '1';
      dropdownContent.style.visibility = 'visible';
      dropdownContent.style.transform = 'translateY(0)';
    }
  }

  function hideDropdown(dropdown) {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.opacity = '0';
      dropdownContent.style.visibility = 'hidden';
      dropdownContent.style.transform = 'translateY(-10px)';
    }
  }

  // Handle responsive behavior
  function handleResponsiveNavigation() {
    // There may be multiple `.md-tabs` (e.g. Material tabs + our custom tabs).
    // Never blindly hide the first `.md-tabs` or we may hide the custom nav itself.
    const allTabs = Array
      .from(document.querySelectorAll('nav.md-tabs[data-md-component="tabs"]'))
      .filter(tab => !tab.closest('.md-drawer')); // ignore drawer tabs

    const customTabs = allTabs.find(tab => tab.querySelector('.custom-nav-container'));
    const originalTabs = allTabs.find(tab => tab !== customTabs);
    const customNav = customTabs ? customTabs.querySelector('.custom-nav-container') : null;

    const showCustom = window.innerWidth > 1220; // 76.25em = 1220px

    if (customTabs) customTabs.style.display = showCustom ? 'block' : 'none';
    if (customNav) customNav.style.display = showCustom ? 'flex' : 'none';
    if (originalTabs) originalTabs.style.display = showCustom ? 'none' : 'block';
  }

  // Listen for window resize
  window.addEventListener('resize', handleResponsiveNavigation);
  
})();
