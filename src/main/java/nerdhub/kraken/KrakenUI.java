package nerdhub.kraken;

import com.vaadin.annotations.Push;
import com.vaadin.annotations.Theme;
import com.vaadin.server.VaadinRequest;
import com.vaadin.shared.ui.ui.Transport;
import com.vaadin.ui.Label;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;
import com.vaadin.ui.themes.ValoTheme;

@Push(transport = Transport.WEBSOCKET)
@Theme(ValoTheme.THEME_NAME)
public class KrakenUI extends UI {

    @Override
    protected void init(VaadinRequest request) {
        Runtime runtime = Runtime.getRuntime();

        Label label = new Label("Hello Kraken World!");
        Label cpu = new Label("PC Specs: CPU: " + runtime.availableProcessors() + " Free MEM: " + runtime.freeMemory() + " Max MEM: " + runtime.maxMemory());
        VerticalLayout contentLayout = new VerticalLayout();
        contentLayout.addComponent(label);
        contentLayout.addComponent(cpu);

        setContent(contentLayout);
    }
}
