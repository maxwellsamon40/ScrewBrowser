class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: #ffffff;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                }
                
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: #6366f1;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }
                
                .nav-link {
                    color: #4b5563;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .nav-link:hover {
                    color: #6366f1;
                }
                
                @media (max-width: 640px) {
                    .nav-container {
                        padding: 0.75rem 1rem;
                    }
                    
                    .logo-text {
                        display: none;
                    }
                }
            </style>
            
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i data-feather="volume-2"></i>
                        <span class="logo-text">Sonic Sculptor</span>
                    </a>
                    <div class="nav-links">
                        <a href="/" class="nav-link">Home</a>
                        <a href="#" class="nav-link">About</a>
                        <a href="#" class="nav-link">Contact</a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);