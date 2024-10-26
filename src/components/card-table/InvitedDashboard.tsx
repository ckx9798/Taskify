import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getReceivedInvitations } from "@/libs/api/Invitations";
import { ReceivedInvitationsResponseType } from "@/libs/api/Invitations"; // Assuming this is where the type is defined

interface Dashboard {
  id: number;
  title: string;
}

const mockData = {
  cursorId: 0,
  invitations: Array.from({ length: 50 }, (_, index) => ({
    id: index,
    inviter: {
      nickname: `Inviter ${index}`,
      email: `inviter${index}@example.com`,
      id: index,
    },
    teamId: `team-${index}`,
    dashboard: {
      title: `Dashboard ${index}`,
      id: index,
    },
    invitee: {
      nickname: `Invitee ${index}`,
      email: `invitee${index}@example.com`,
      id: index,
    },
    inviteAccepted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
};

const InvitedDashboard: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [cursorId, setCursorId] = useState(0);

  useEffect(() => {
    fetchDashboards(cursorId);

    // fetchDashboards();
  }, []);

  const fetchDashboards = async (cursorId: number) => {
    try {
      // const response: ReceivedInvitationsResponseType = await getReceivedInvitations(cursorId);
      // await getReceivedInvitations(cursorId);
      // setDashboards((prevDashboards) => [
      //   ...prevDashboards,
      //   ...response.invitations.map((invitation) => invitation.dashboard),
      // ]);
      // setHasMore(response.invitations.length > 0);
      // if (response.invitations.length > 0) {
      //   setCursorId(response.invitations[response.invitations.length - 1].id);
      // }
      // 목데이터를 페이징하여 가져오기
      const pageSize = 10;
      const start = cursorId;
      const end = cursorId + pageSize;
      const paginatedData = mockData.invitations.slice(start, end);

      if (paginatedData.length === 0) {
        setHasMore(false);
        return;
      }

      setDashboards((prevDashboards) => [
        ...prevDashboards,
        ...paginatedData.map((invitation) => invitation.dashboard),
      ]);
      setCursorId(end);
    } catch (error) {
      console.error("Error fetching dashboards:", error);
    }
  };

  const loadMoreDashboards = () => {
    const newCursorId = cursorId + 10;
    setCursorId(newCursorId);
    fetchDashboards(newCursorId);
    // cursorId는 fetchDashboards 함수에서 업데이트됩니다.
  };

  const handleAccept = (id: number) => {
    // Implement the accept logic here
    setDashboards(dashboards.filter((dashboard) => dashboard.id !== id));
  };

  const handleReject = (id: number) => {
    // Implement the reject logic here
    setDashboards(dashboards.filter((dashboard) => dashboard.id !== id));
  };

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredDashboards.length === 0 ? (
        <p>아직 초대받은 대시보드가 없어요</p>
      ) : (
        <InfiniteScroll
          dataLength={filteredDashboards.length}
          next={loadMoreDashboards}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {filteredDashboards.map((dashboard) => (
            <div key={dashboard.id} className="text-white">
              <h3>{dashboard.title}</h3>
              <button onClick={() => handleAccept(dashboard.id)}>수락</button>
              <button onClick={() => handleReject(dashboard.id)}>거절</button>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default InvitedDashboard;
