package nerdhub.kraken;

import com.vaadin.annotations.VaadinServletConfiguration;
import com.vaadin.server.VaadinServlet;

import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = "/*", name = "KrakenServlet")
@VaadinServletConfiguration(ui = KrakenUI.class, productionMode = false)
public class KrakenServlet extends VaadinServlet {
}
