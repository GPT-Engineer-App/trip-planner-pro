import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Box>
        <Link to="/">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link to="/plan-trip">
          <Button variant="ghost">Plan a Trip</Button>
        </Link>
        <Link to="/checklist">
          <Button variant="ghost">Checklist</Button>
        </Link>
        <Link to="/language-phrases">
          <Button variant="ghost">Language Phrases</Button>
        </Link>
        <Link to="/emergency-contacts">
          <Button variant="ghost">Emergency Contacts</Button>
        </Link>
        <Link to="/weather-forecast">
          <Button variant="ghost">Weather Forecast</Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
