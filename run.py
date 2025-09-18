#!/usr/bin/env python3
"""
Local development server for testing redirect functionality.
This allows you to test the redirect behavior locally before deploying to GitHub Pages.
Supports multiple language configurations via config.json.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
from urllib.parse import urlparse, parse_qs

class RedirectHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler that simulates the redirect behavior."""
    
    def __init__(self, *args, **kwargs):
        self.config = self.load_config()
        super().__init__(*args, **kwargs)
    
    def load_config(self):
        """Load configuration from config.json."""
        try:
            with open('config.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print("⚠️  config.json not found, using default configuration")
            return {
                "target_domain": "https://openterface.com",
                "target_lang": "ro"
            }
        except json.JSONDecodeError as e:
            print(f"⚠️  Error parsing config.json: {e}, using default configuration")
            return {
                "target_domain": "https://openterface.com",
                "target_lang": "ro"
            }
    
    def do_GET(self):
        """Handle GET requests with redirect logic."""
        # Parse the path
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle config.json request
        if path == '/config.json':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(self.config, indent=2).encode())
            return
        
        # Handle index.html request
        if path == '/' or path == '/index.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            # Read and serve the actual index.html
            try:
                with open('index.html', 'r') as f:
                    html_content = f.read()
                self.wfile.write(html_content.encode())
            except FileNotFoundError:
                self.wfile.write(b"<h1>index.html not found</h1>")
            return
        
        # Construct the redirect URL: target_domain + /target_lang + path
        redirect_url = f"{self.config['target_domain']}/{self.config['target_lang']}{path}"
        
        # Log the redirect
        print(f"Redirecting: {self.path} -> {redirect_url}")
        
        # Send redirect response (301 Permanent Redirect)
        self.send_response(301)
        self.send_header('Location', redirect_url)
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        
        # Send a simple HTML body for browsers that don't follow redirects
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Redirecting...</title>
            <meta http-equiv="refresh" content="0; url={redirect_url}">
        </head>
        <body>
            <h1>Redirecting...</h1>
            <p>You are being redirected to: <a href="{redirect_url}">{redirect_url}</a></p>
        </body>
        </html>
        """
        self.wfile.write(html_body.encode())
    
    def log_message(self, format, *args):
        """Override to provide cleaner logging."""
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    """Main function to start the local server."""
    PORT = 8002
    
    # Load configuration to show current settings
    try:
        with open('config.json', 'r') as f:
            config = json.load(f)
        print(f"📋 Configuration loaded:")
        print(f"   Target Domain: {config['target_domain']}")
        print(f"   Target Language: {config['target_lang']}")
    except FileNotFoundError:
        print("⚠️  config.json not found, using default configuration")
    except json.JSONDecodeError as e:
        print(f"⚠️  Error parsing config.json: {e}")
    
    # Check if port is available, try next port if not
    while True:
        try:
            with socketserver.TCPServer(("", PORT), RedirectHandler) as httpd:
                print(f"\n🚀 Starting redirect test server on port {PORT}")
                print(f"📡 Server running at: http://localhost:{PORT}")
                print(f"🔗 Test URLs:")
                print(f"   - http://localhost:{PORT}/")
                print(f"   - http://localhost:{PORT}/docs")
                print(f"   - http://localhost:{PORT}/api/v1/test")
                print(f"   - http://localhost:{PORT}/some/deep/nested/path")
                print(f"   - http://localhost:{PORT}/config.json (view config)")
                
                # Show redirect targets based on config
                try:
                    target_domain = config['target_domain']
                    target_lang = config['target_lang']
                    print(f"\n💡 These will redirect to:")
                    print(f"   - {target_domain}/{target_lang}/")
                    print(f"   - {target_domain}/{target_lang}/docs")
                    print(f"   - {target_domain}/{target_lang}/api/v1/test")
                    print(f"   - {target_domain}/{target_lang}/some/deep/nested/path")
                except:
                    print(f"\n💡 These will redirect to:")
                    print(f"   - https://openterface.com/ro/")
                    print(f"   - https://openterface.com/ro/docs")
                    print(f"   - https://openterface.com/ro/api/v1/test")
                    print(f"   - https://openterface.com/ro/some/deep/nested/path")
                
                print(f"\n⏹️  Press Ctrl+C to stop the server")
                
                # Open browser automatically
                try:
                    webbrowser.open(f'http://localhost:{PORT}')
                except:
                    pass
                
                httpd.serve_forever()
        except OSError as e:
            if e.errno == 48:  # Address already in use
                PORT += 1
                print(f"Port {PORT-1} is in use, trying port {PORT}...")
                continue
            else:
                print(f"Error starting server: {e}")
                sys.exit(1)
        except KeyboardInterrupt:
            print(f"\n👋 Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
