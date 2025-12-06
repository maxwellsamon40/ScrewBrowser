class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #1f2937;
                    color: #f3f4f6;
                    padding: 2rem 1rem;
                    margin-top: 3rem;
                }
                
                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }
                
                .footer-section h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #ffffff;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .footer-link {
                    color: #d1d5db;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-link:hover {
                    color: #ffffff;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-link {
                    color: #d1d5db;
                    transition: color 0.2s;
                }
                
                .social-link:hover {
                    color: #ffffff;
                }
                
                .copyright {
                    text-align: center;
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #374151;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 640px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-container">
                    <div class="footer-section">
                        <h3>Sonic Sculptor</h3>
                        <p>Transform your audio with pitch, speed and effects.</p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i data-feather="twitter"></i></a>
                            <a href="#" class="social-link"><i data-feather="github"></i></a>
                            <a href="#" class="social-link"><i data-feather="instagram"></i></a>
                            <a href="#" class="social-link"><i data-feather="facebook"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <div class="footer-links">
                            <a href="#" class="footer-link">Home</a>
                            <a href="#" class="footer-link">About</a>
                            <a href="#" class="footer-link">Features</a>
                            <a href="#" class="footer-link">Contact</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Legal</h3>
                        <div class="footer-links">
                            <a href="#" class="footer-link">Privacy Policy</a>
                            <a href="#" class="footer-link">Terms of Service</a>
                            <a href="#" class="footer-link">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                
                <div class="copyright">
                    &copy; ${new Date().getFullYear()} Sonic Sculptor. All rights reserved.
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);