import React, { useState } from "react";
import law from "../../../public/iAccess/Law.png";
import "../../styles/iAccess/legal.css";
import Accordion from "react-bootstrap/Accordion";

export default function LegalPage() {
  return (
    <div className="legal">
      <div className="legal-header">
        <img src={law} alt="legal" className="law-image" />
        <h1 className="legal-header-title">Legal</h1>
      </div>
      <div className="legal-body">
        <h2 className="legal-body-title">NOTE:</h2>
        <p className="legal-body-text">
          Please note that this is not legal advice, and individuals should
          consult with a legal professional for specific guidance related to
          their situation. Here is a basic guide:
        </p>
      </div>
      <div className="legal-Accordion custom-accordion">
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <ul className="accordion-list" aria-label="Legal accordion list">
          <li>
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                The Accessibility for Ontarians with Disabilities Act, 2005
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                The Accessibility for Ontarians with Disabilities Act (AODA) is
                a law that sets out a process for developing and enforcing
                accessibility standards. Persons with disabilities and industry
                representatives work together with the government to develop the
                standards. Under the AODA, the government is responsible for
                creating accessibility standards that organizations must follow.
                Implementing and enforcing these standards will help us work
                together to make Ontario more accessible and inclusive by 2025.{" "}
                <a
                  href="https://www.ontario.ca/laws/statute/05a11"
                  target="_blank"
                  aria-label="Link to Ontario AODA page"
                >
                  Read more here
                </a>
              </div>
            </div>
          </div>
          </li>
          <li>
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Information and communications standard
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                This standard helps organizations make their information
                accessible to people with disabilities.{" "}
                <a
                  href="https://www.ontario.ca/laws/regulation/110191#BK9"
                  target="_blank"
                  aria-label="Link to Information and communications standard in Ontario"
                >
                  Read more here
                </a>
              </div>
            </div>
          </div>
          </li>
          <li>
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Transportation standard
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                This standard makes it easier for everyone to travel in the
                province.{" "}
                <a
                  href="https://www.ontario.ca/laws/regulation/110191#BK35"
                  target="_blank"
                  aria-label="Link to Transportation standard in Ontario"
                >
                  Read more here
                </a>
              </div>
            </div>
          </div>
          </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
