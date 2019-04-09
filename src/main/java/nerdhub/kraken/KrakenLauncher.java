package nerdhub.kraken;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.session.SessionHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class KrakenLauncher {

    public static void main(String[] args) {
        ServletContextHandler contextHandler = new ServletContextHandler(null, "/", true, false);
        contextHandler.setSessionHandler(new SessionHandler());
        contextHandler.addServlet(new ServletHolder(KrakenServlet.class), "/*");

        Server server = new Server(8080);
        server.setHandler(contextHandler);

        try {
            server.start();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
