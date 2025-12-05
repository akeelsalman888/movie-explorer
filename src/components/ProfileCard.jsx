// FILE: src/components/ProfileCard.jsx

import { Card } from "react-bootstrap";

export default function ProfileCard({ user }) {
    // Placeholder avatar if user has no profile picture
    const placeholderAvatar =
        "https://via.placeholder.com/150?text=No+Avatar";

    return (
        // Card displaying user profile information
        <Card className="shadow-lg border-0 p-3 text-center">
            {/* User avatar */}
            <Card.Img
                variant="top"
                src={user.avatar || placeholderAvatar}
                alt={user.name}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <Card.Body>
                {/* User name */}
                <Card.Title className="fw-bold">{user.name}</Card.Title>

                {/* Username */}
                <Card.Text className="text-muted mb-2">@{user.username}</Card.Text>

                {/* Email */}
                <Card.Text>Email: {user.email}</Card.Text>

                {/* Role */}
                <Card.Text>Role: {user.role || "Member"}</Card.Text>

                {/* Bio */}
                <Card.Text>
                    Bio: {user.bio || "No bio provided yet."}
                </Card.Text>

                {/* Join date */}
                <Card.Text className="text-muted">
                    Joined: {user.joinDate || "Unknown"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
