using DataAccess.Entities;
using DataAccess.Enums;
using DataAccess.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests
{
    /// <summary>
    /// Tests for the <see cref="ChatEntryService"/> service.
    /// </summary>
    /// Note: since there are two enumerators (<see cref="TimeInterval"/> and <see cref="EventType"/>)
    /// and the service should be able to execute its main function with any arrangement of both,
    /// this class has a test setup where it maps all values of each enumerator into a list,
    /// which is then used in each method inside "foreach" loops to test all combinations possible of both lists.
    [TestClass]
    public class ChatEntryServiceTests
    {
        /// <summary>
        /// All time intervals enum values as an enumerable
        /// </summary>
        private static IEnumerable<TimeInterval> AllTimeIntervals
        {
            get
            {
                var values = Enum.GetValues(typeof(TimeInterval));
                return values.Cast<TimeInterval>();
            }
        }

        /// <summary>
        /// All event type enum values as an enumerable
        /// </summary>
        private static IEnumerable<EventType> AllEventTypes
        {
            get
            {
                var values = Enum.GetValues(typeof(EventType));
                return values.Cast<EventType>();
            }
        }

        #region Same event type

        private void givenNoUser_WhenNoEventCaused_ThenResultEmptyList(TimeInterval timeInterval)
        {
            // Arrange
            var expectedTimestampGroupsCount = 0;

            var chatEntryService = new ChatEntryService(new List<ChatEvent>());

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count, timeInterval.ToString());
        }

        [TestMethod]
        [TestCategory("NoUser")]
        public void GivenNoUser_WhenNoEventCaused_ThenResultEmptyList()
        {
            foreach (var timeInterval in AllTimeIntervals)
                givenNoUser_WhenNoEventCaused_ThenResultEmptyList(timeInterval);
        }

        private void givenOneUser_WhenCausedEvent_ThenResultIsOneChatEvent(TimeInterval timeInterval, EventType eventType)
        {
            // Arrange
            var expectedChatEvent = new ChatEvent("Bob", eventType, new DateTime());
            var chatEntryService = new ChatEntryService(new List<ChatEvent>
            {
                expectedChatEvent
            });

            var expectedTimestampGroupsCount = 1;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 1;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup = result.First();
            Assert.AreEqual(expectedChatEvent.Timestamp, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(expectedChatEvent.EventType, eventTypeGroup.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup.Events.Count);

            var chatEvent = eventTypeGroup.Events.First();
            Assert.AreEqual(expectedChatEvent, chatEvent);
        }

        [TestMethod]
        [TestCategory("OneUser")]
        public void GivenOneUser_WhenCausedEvent_ThenResultIsOneChatEvent()
        {
            foreach (var timeInterval in AllTimeIntervals)
                foreach (var eventType in AllEventTypes)
                    givenOneUser_WhenCausedEvent_ThenResultIsOneChatEvent(timeInterval, eventType);
        }

        private void givenTwoUsers_WhenFiredEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoChatEvents(TimeInterval timeInterval, EventType eventType, DateTime timestamp1, DateTime timestamp2)
        {
            // Arrange
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent("Bob", eventType, timestamp1),
                new ChatEvent("Kate", eventType, timestamp2)
            };

            var chatEntryService = new ChatEntryService(expectedChatEventList);

            var expectedTimestampGroupsCount = 1;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 2;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup = result.First();
            Assert.AreEqual(timestamp1, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup.Events.Count);

            CollectionAssert.AreEqual(expectedChatEventList, eventTypeGroup.Events);
        }

        [TestMethod]
        [TestCategory("MultipleUsers")]
        public void GivenTwoUsers_WhenFiredEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoChatEvents()
        {
            var timestamp1 = new DateTime(2022, 1, 1, 0, 0, 0);
            foreach (var timeInterval in AllTimeIntervals)
            {
                var timestamp2 = (timeInterval == TimeInterval.MinuteByMinute)
                    ? timestamp1.AddSeconds(59)
                    : timestamp1.AddMinutes(59);

                foreach (var eventType in AllEventTypes)
                    givenTwoUsers_WhenFiredEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoChatEvents(timeInterval, eventType, timestamp1, timestamp2);
            }
        }

        private void givenTwoUsers_WhenFiredEventAtDifferentTimeIntervals_ThenResultIsTwoTimestampGroupWithOneChatEventEach(TimeInterval timeInterval, EventType eventType, DateTime timestamp1, DateTime timestamp2)
        {
            // Arrange
            var expectedChatEvent1 = new ChatEvent("Bob", eventType, timestamp1);
            var expectedChatEvent2 = new ChatEvent("Kate", eventType, timestamp2);

            var expectedChatEventList = new List<ChatEvent>
            {
                expectedChatEvent1,
                expectedChatEvent2
            };

            var chatEntryService = new ChatEntryService(expectedChatEventList);

            var expectedTimestampGroupsCount = 2;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 1;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup1 = result.First();
            Assert.AreEqual(timestamp1, timestampGroup1.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup1.EventTypeChatEntryGroups.Count);

            var eventTypeGroup1 = timestampGroup1.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup1.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup1.Events.Count);

            Assert.AreEqual(expectedChatEvent1, eventTypeGroup1.Events.First());

            var timestampGroup2 = result.Last();
            Assert.AreEqual(timestamp2, timestampGroup2.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup2.EventTypeChatEntryGroups.Count);

            var eventTypeGroup2 = timestampGroup2.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup2.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup2.Events.Count);

            Assert.AreEqual(expectedChatEvent2, eventTypeGroup2.Events.First());

            Assert.AreNotEqual(timestampGroup1.Timestamp, timestampGroup2.Timestamp);
        }

        [TestMethod]
        [TestCategory("MultipleUsers")]
        public void GivenTwoUsers_WhenFiredEventAtDifferentTimeIntervals_ThenResultIsTwoTimestampGroupWithOneChatEventEach()
        {
            var timestamp1 = new DateTime(2022, 1, 1, 0, 0, 0);
            foreach (var timeInterval in AllTimeIntervals)
            {
                var timestamp2 = (timeInterval == TimeInterval.MinuteByMinute)
                    ? timestamp1.AddMinutes(1)
                    : timestamp1.AddHours(1);

                foreach (var eventType in AllEventTypes)
                    givenTwoUsers_WhenFiredEventAtDifferentTimeIntervals_ThenResultIsTwoTimestampGroupWithOneChatEventEach(timeInterval, eventType, timestamp1, timestamp2);
            }
        }

        #endregion

        #region Different event types

        public void givenOneUser_WhenCausedDifferentEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoEventTypeGroups(TimeInterval timeInterval, EventType eventType1, EventType eventType2)
        {
            // Arrange
            var timestamp = new DateTime();
            var expectedChatEvent1 = new ChatEvent("Bob", eventType1, timestamp);
            var expectedChatEvent2 = new ChatEvent("Bob", eventType2, timestamp);
            var expectedChatEventList = new List<ChatEvent>
            {
                expectedChatEvent1,
                expectedChatEvent2
            };
            var expectedTimestampGroupsCount = 1;
            var expectedEventTypeGroupsCount = 2;
            var expectedChatEventsCount = 1;

            var chatEntryService = new ChatEntryService(expectedChatEventList);

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup = result.First();
            Assert.AreEqual(expectedChatEvent1.Timestamp, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup1 = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(expectedChatEvent1.EventType, eventTypeGroup1.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup1.Events.Count);

            var chatEvent1 = eventTypeGroup1.Events.First();
            Assert.AreEqual(expectedChatEvent1, chatEvent1);

            var eventTypeGroup2 = timestampGroup.EventTypeChatEntryGroups.Last();
            Assert.AreEqual(expectedChatEvent2.EventType, eventTypeGroup2.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup2.Events.Count);
            
            Assert.AreNotEqual(eventTypeGroup1.EventType, eventTypeGroup2.EventType);

            var chatEvent2 = eventTypeGroup2.Events.First();
            Assert.AreEqual(expectedChatEvent2, chatEvent2);

            Assert.AreNotEqual(chatEvent1.EventType, chatEvent2.EventType);
            Assert.AreEqual(chatEvent1.UserName, chatEvent2.UserName);
            Assert.AreEqual(chatEvent1.Timestamp, chatEvent2.Timestamp);
        }

        [TestMethod]
        [TestCategory("OneUser")]
        public void GivenOneUser_WhenCausedDifferentEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoEventTypeGroups()
        {
            foreach (var timeInterval in AllTimeIntervals)
                foreach (var eventType1 in AllEventTypes)
                    foreach (var eventType2 in AllEventTypes.Except(new List<EventType>() { eventType1 }))
                        givenOneUser_WhenCausedDifferentEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoEventTypeGroups(timeInterval, eventType1, eventType2);
        }

        #endregion

    }
}