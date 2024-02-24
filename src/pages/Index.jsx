import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, Textarea, VStack, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Checkbox, CheckboxGroup, List, ListItem, ListIcon, IconButton, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaPlus, FaShareSquare, FaCheck, FaCheckDouble } from "react-icons/fa";

// Mock data for trips and checklist
const mockTrips = [
  {
    id: 1,
    destination: "Paris, France",
    startDate: "2023-04-10",
    endDate: "2023-04-20",
    activities: ["Visit Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
  },
  // Add more mock trips if necessary
];

const mockChecklist = [
  { id: 1, item: "Passport", completed: false },
  { id: 2, item: "Travel insurance", completed: false },
  // Add more mock checklist items if necessary
];

// Mock data for language phrases
const mockLanguagePhrases = [
  { phrase: "Hello", translation: "Bonjour" },
  { phrase: "Thank you", translation: "Merci" },
  // Add more mock phrases if necessary
];

// Mock data for emergency contacts
const mockEmergencyContacts = [
  { type: "Local Police", contact: "112" },
  { type: "Embassy", contact: "+33 1 43 12 22 22" },
  // Add more mock emergency contacts if necessary
];

// Mock data for weather forecast
const mockWeatherForecast = [
  { day: "Monday", forecast: "Sunny", high: 24, low: 14 },
  { day: "Tuesday", forecast: "Partly Cloudy", high: 22, low: 13 },
  // Add more mock forecast if necessary
];

const Index = () => {
  // State for trips, checklist, etc.
  const [trips, setTrips] = useState(mockTrips);
  const [checklist, setChecklist] = useState(mockChecklist);
  const [languagePhrases] = useState(mockLanguagePhrases);
  const [emergencyContacts] = useState(mockEmergencyContacts);
  const [weatherForecast] = useState(mockWeatherForecast);

  // State for form inputs
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");

  // Chakra UI disclosure hooks for modals and toasts
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  // Function to handle adding a new trip
  const handleAddTrip = () => {
    const newTrip = {
      id: trips.length + 1,
      destination,
      startDate,
      endDate,
      activities: activities.split(",").map((activity) => activity.trim()),
    };
    setTrips([...trips, newTrip]);
    setDestination("");
    setStartDate("");
    setEndDate("");
    setActivities("");
    toast({
      title: "Trip added.",
      description: "We've added your trip successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // Function to handle deleting a trip
  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
    onClose();
  };

  // Function to handle adding a checklist item
  const handleAddChecklistItem = () => {
    const newItem = {
      id: checklist.length + 1,
      item: newChecklistItem,
      completed: false,
    };
    setChecklist([...checklist, newItem]);
    setNewChecklistItem("");
  };

  // Function to handle marking checklist item as completed
  const handleChecklistItemChange = (id) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  // Function to create a toast notification for sharing itinerary
  const handleShareItinerary = () => {
    toast({
      title: "Itinerary shared.",
      description: "Your itinerary has been shared successfully.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  // Function to handle editing trip (you can add more functionality here)
  const handleEditTrip = (id) => {
    // For the prototype, we'll just display a toast
    toast({
      title: "Trip editing not implemented.",
      description: "This functionality will be available in future updates.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading my={4}>Travel Planner</Heading>

      {/* Dashboard */}
      <Box>
        <Heading size="md" mb={4}>
          Your Trips
        </Heading>
        <VStack spacing={4}>
          {trips.map((trip) => (
            <Flex key={trip.id} p={4} shadow="md" borderWidth="1px" width="full" justifyContent="space-between">
              <Box>
                <Heading size="sm">{trip.destination}</Heading>
                <Text>
                  {trip.startDate} to {trip.endDate}
                </Text>
                <Text>{trip.activities.join(", ")}</Text>
              </Box>
              <Box>
                <Button leftIcon={<FaPencilAlt />} size="sm" onClick={() => handleEditTrip(trip.id)}>
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} size="sm" ml={2} onClick={onOpen}>
                  Delete
                </Button>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Trip
                      </AlertDialogHeader>

                      <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDeleteTrip(trip.id)} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <Button leftIcon={<FaShareSquare />} size="sm" ml={2} onClick={handleShareItinerary}>
                  Share
                </Button>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Plan a Trip */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Plan a Trip
        </Heading>
        <Stack spacing={3}>
          <Input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <Input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <Textarea placeholder="Activities (comma separated)" value={activities} onChange={(e) => setActivities(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTrip}>
            Add Trip
          </Button>
        </Stack>
      </Box>

      {/* Travel Checklist */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Travel Checklist
        </Heading>
        <CheckboxGroup colorScheme="green">
          <List spacing={2}>
            {checklist.map((item) => (
              <ListItem key={item.id}>
                <Checkbox isChecked={item.completed} onChange={() => handleChecklistItemChange(item.id)}>
                  {item.item}
                </Checkbox>
              </ListItem>
            ))}
          </List>
        </CheckboxGroup>
        <InputGroup mt={4}>
          <Input placeholder="New checklist item" value={newChecklistItem} onChange={(e) => setNewChecklistItem(e.target.value)} />
          <InputRightElement>
            <IconButton aria-label="Add checklist item" icon={<FaPlus />} onClick={handleAddChecklistItem} />
          </InputRightElement>
        </InputGroup>
      </Box>

      {/* Local Language Phrases */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Local Language Phrases
        </Heading>
        <List spacing={2}>
          {languagePhrases.map((phrase, index) => (
            <ListItem key={index}>
              <ListIcon as={FaCheckDouble} color="green.500" />
              {phrase.phrase} - {phrase.translation}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Emergency Contacts */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Emergency Contacts
        </Heading>
        <List spacing={2}>
          {emergencyContacts.map((contact, index) => (
            <ListItem key={index}>
              <ListIcon as={FaCheck} color="red.500" />
              {contact.type}: {contact.contact}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Weather Forecast */}
      <Box mt={10}>
        <Heading size="md" mb={4}>
          Weather Forecast
        </Heading>
        <List spacing={2}>
          {weatherForecast.map((dayForecast, index) => (
            <ListItem key={index}>
              <Text>
                <strong>{dayForecast.day}</strong>: {dayForecast.forecast} (High: {dayForecast.high}°C, Low: {dayForecast.low}°C)
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;
