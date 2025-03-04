import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SaveCard from './SaveCard';
import { Search } from 'lucide-react';
import { deleteSharedProfile, MySharedProfile } from '../services/api';

const SaveSection = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    const apiCalled = useRef(false);

    const fetchProfiles = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
    
            const response = await MySharedProfile(token);
            console.log("API Response:", response); // 🔍 Debug API Response
    
            if (response.data && Array.isArray(response.data.data)) {
                console.log("Raw Profiles from API:", response.data.data);
                
                const fetchedProfiles = response.data.data.map(item => item.profile);
                console.log("Processed Profiles:", fetchedProfiles);
    
                setProfiles(fetchedProfiles);
            } else {
                throw new Error("Unexpected API response format.");
            }
        } catch (err) {
            console.error("Error fetching profiles:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        // const fetchProfiles = async () => {
        //     if (apiCalled.current) return;
        //     apiCalled.current = true;

        //     try {
        //         const token = localStorage.getItem('authToken');
        //         if (!token) {
        //             throw new Error("No token found. Please log in.");
        //         }

        //         const response = await MySharedProfile(token);
        //         console.log('MySaved Profile:--->',response);
        //         if (response.data && Array.isArray(response.data.data)) {
        //             const fetchedProfiles = response.data.data.map(item => item.profile);
        //             const uniqueProfiles = Array.from(
        //                 new Map(fetchedProfiles.map(profile => [profile.id, profile])).values()
        //             );
        //             setProfiles(uniqueProfiles);
        //         } else {
        //             throw new Error("Unexpected API response format.");
        //         }
        //     } catch (err) {
        //         console.error("Error fetching profiles:", err);
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        
        

        fetchProfiles();
    }, []);


    useEffect(() => {
        console.log("Profiles state updated:", profiles);
    }, [profiles]);
    
    // const handleDeleteProfile = async (profileId) => {
    //     try {
    //         const response = await deleteSharedProfile(profileId);
    //         if (response.status === 200) {
    //             setProfiles((prevProfiles) =>
    //                 prevProfiles.filter((profile) => profile.id !== profileId)
    //             );
    //             console.log("Profile deleted successfully");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting profile:", error);
    //         alert("Failed to delete profile.");
    //     }
    // };

    // const handleDeleteProfile = async (profileId) => {
    //     try {
    //         const response = await deleteSharedProfile(profileId);
    //         if (response.status === 200) {
    //             setProfiles((prevProfiles) =>
    //                 prevProfiles.filter((profile) => profile.id !== profileId)
    //             );
    //             console.log("Profile deleted successfully");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting profile:", error);
    //         alert("Failed to delete profile.");
    //     }
    // };

    const handleDeleteProfile = async (profileId) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("Token before delete request:", token); // ✅ Debugging token

            if (!token) {
                alert("Authentication error: Please log in again.");
                return;
            }

            const response = await deleteSharedProfile(profileId, token);
            if (response.status === 200) {
                console.log("Profile deleted:", response.data);
                setProfiles((prevProfiles) =>
                    prevProfiles.filter((profile) => profile.id !== profileId) // ✅ Check correct ID reference
                );
                alert("Profile deleted successfully!");
            } else {
                console.error("Unexpected response:", response);
                alert("Failed to delete profile. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting profile:", error.response ? error.response.data : error);
            // alert(`Failed to delete profile. ${error.response?.data?.error || error.message}`);
        }
    };

    if (loading) {
        return <p>Loading profiles...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const filteredProfiles = profiles.filter((profile) =>
        profile.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    console.log("Filtered Profiles:", filteredProfiles);

    return (
        <section className='mt-3'>
            <Container>
                <div className='search-conatienr'>
                    <h2 className="saved-profiles-title">Saved Profiles</h2>

                    <div className="search-box">
                        <Search className="search-icon" />
                        <input type="text" placeholder="Search" className="search-input" />
                    </div>
                </div>
                <Row className='margin-layout'>
                    {filteredProfiles.length > 0 ? (
                        filteredProfiles.map((profile, index) => (
                            <Col key={profile.id || index} lg={4} md={6} sm={12} xs={12} className='d-flex justify-content-center'>
                                <SaveCard profile={profile} onDelete={handleDeleteProfile} />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>No profiles found.</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
}

export default SaveSection;
